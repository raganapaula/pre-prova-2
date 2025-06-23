"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Users, UserPlus, GraduationCap, TrendingUp, BookOpen, Award, Target } from "lucide-react"
import Link from "next/link"

interface Student {
  _id: string
  nome: string
  idade: number
  ra: string
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://crudcrud.com/api/ebcf1d1c96554d8a926e9ed414e9cd76/students")
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalStudents = students.length
  const averageAge =
    students.length > 0 ? Math.round(students.reduce((sum, student) => sum + student.idade, 0) / students.length) : 0

  const stats = [
    {
      title: "Total de Estudantes",
      value: totalStudents,
      description: "Estudantes cadastrados",
      icon: Users,
      gradient: "gradient-card-1",
      trend: "+12%",
    },
    {
      title: "Idade Média",
      value: `${averageAge} anos`,
      description: "Média de idade",
      icon: TrendingUp,
      gradient: "gradient-card-2",
      trend: "+2%",
    },
    {
      title: "Turmas Ativas",
      value: "3",
      description: "Turmas em andamento",
      icon: BookOpen,
      gradient: "gradient-card-3",
      trend: "+1",
    },
    {
      title: "Taxa de Aprovação",
      value: "94%",
      description: "Aprovação geral",
      icon: Award,
      gradient: "gradient-card-4",
      trend: "+5%",
    },
  ]

  const quickActions = [
    {
      title: "Cadastrar Estudante",
      description: "Adicionar novo estudante ao sistema",
      icon: UserPlus,
      href: "/students/create",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      title: "Ver Estudantes",
      description: "Listar todos os estudantes",
      icon: Users,
      href: "/students",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios e estatísticas",
      icon: Target,
      href: "/reports",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-purple-700">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sistema de Gerenciamento Escolar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gerencie estudantes, turmas e relatórios de forma simples e eficiente
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                className={`${stat.gradient} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">{stat.title}</CardTitle>
                  <stat.icon className="h-5 w-5 opacity-80 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs opacity-80 mb-2">{stat.description}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-2 border-transparent hover:border-purple-200">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Students */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Estudantes Recentes</h2>
              <Link href="/students">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Ver Todos
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.slice(0, 6).map((student, index) => (
                  <Card
                    key={student._id}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-l-4 border-l-purple-400"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                          {student.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                            {student.nome}
                          </CardTitle>
                          <CardDescription>
                            {student.idade} anos • RA: {student.ra}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {!loading && students.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum estudante cadastrado</h3>
                  <p className="text-gray-500 mb-4">Comece cadastrando seu primeiro estudante</p>
                  <Link href="/students/create">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Cadastrar Estudante
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
