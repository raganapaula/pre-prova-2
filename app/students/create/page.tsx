"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { UserPlus, Loader2, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function CreateStudent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    ra: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://crudcrud.com/api/ebcf1d1c96554d8a926e9ed414e9cd76/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          idade: Number.parseInt(formData.idade),
          ra: formData.ra,
        }),
      })

      if (response.ok) {
        toast.success("Estudante cadastrado com sucesso!")
        router.push("/students")
      } else {
        toast.error("Erro ao cadastrar estudante")
      }
    } catch (error) {
      console.error("Erro:", error)
      toast.error("Erro ao cadastrar estudante")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
              <BreadcrumbLink href="/students" className="text-purple-600 hover:text-purple-800">
                Estudantes
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-green-700">Cadastrar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mx-auto">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Cadastrar Novo Estudante
            </h1>
            <p className="text-lg text-gray-600">Preencha os dados do estudante para adicionar ao sistema</p>
          </div>

          {/* Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800">Dados do Estudante</CardTitle>
              <CardDescription className="text-gray-600">Todos os campos são obrigatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-semibold text-gray-700">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite o nome completo do estudante"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idade" className="text-sm font-semibold text-gray-700">
                    Idade
                  </Label>
                  <Input
                    id="idade"
                    name="idade"
                    type="number"
                    placeholder="Digite a idade"
                    value={formData.idade}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ra" className="text-sm font-semibold text-gray-700">
                    Registro Acadêmico (RA)
                  </Label>
                  <Input
                    id="ra"
                    name="ra"
                    type="text"
                    placeholder="Digite o RA do estudante"
                    value={formData.ra}
                    onChange={handleChange}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-50"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Cadastrar Estudante
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
