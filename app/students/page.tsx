"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Search, Trash2, UserPlus, GraduationCap, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface Student {
  _id: string
  nome: string
  idade: number
  ra: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ra.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredStudents(filtered)
  }, [students, searchTerm])

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://crudcrud.com/api/ebcf1d1c96554d8a926e9ed414e9cd76/students")
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error)
      toast.error("Erro ao carregar estudantes")
    } finally {
      setLoading(false)
    }
  }

  const deleteStudent = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await fetch(`https://crudcrud.com/api/ebcf1d1c96554d8a926e9ed414e9cd76/students/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setStudents(students.filter((student) => student._id !== id))
        toast.success("Estudante excluído com sucesso!")
      } else {
        toast.error("Erro ao excluir estudante")
      }
    } catch (error) {
      console.error("Erro:", error)
      toast.error("Erro ao excluir estudante")
    } finally {
      setDeletingId(null)
    }
  }

  const getAgeColor = (age: number) => {
    if (age < 18) return "bg-blue-100 text-blue-800"
    if (age < 25) return "bg-green-100 text-green-800"
    if (age < 35) return "bg-yellow-100 text-yellow-800"
    return "bg-purple-100 text-purple-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-purple-600 hover:text-purple-800">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-blue-700">Estudantes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gerenciar Estudantes
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {loading ? "Carregando..." : `${filteredStudents.length} estudante(s) encontrado(s)`}
              </p>
            </div>
            <Link href="/students/create">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold h-12 px-6">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Estudante
              </Button>
            </Link>
          </div>

          {/* Search */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou RA..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          {loading ? (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-8"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : filteredStudents.length === 0 ? (
            <Card className="text-center py-16 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent>
                <GraduationCap className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-3">
                  {searchTerm ? "Nenhum estudante encontrado" : "Nenhum estudante cadastrado"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchTerm
                    ? "Tente buscar com outros termos ou verifique a ortografia"
                    : "Comece cadastrando seu primeiro estudante no sistema"}
                </p>
                {!searchTerm && (
                  <Link href="/students/create">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold h-12 px-8">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Cadastrar Primeiro Estudante
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="text-xl font-bold">Lista de Estudantes</CardTitle>
                <CardDescription className="text-blue-100">
                  {filteredStudents.length} estudante(s) cadastrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Estudante
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          RA
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Idade
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student._id}
                          className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {student.nome.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                  {student.nome}
                                </div>
                                <div className="text-sm text-gray-500">Estudante</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-full text-gray-700 inline-block">
                              {student.ra}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={`${getAgeColor(student.idade)} border-0 font-semibold text-sm px-3 py-1`}>
                              {student.idade} anos
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:scale-105 transition-all duration-200"
                                  disabled={deletingId === student._id}
                                >
                                  {deletingId === student._id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Excluir
                                    </>
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    Confirmar Exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o estudante <strong>{student.nome}</strong>? Esta
                                    ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteStudent(student._id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
