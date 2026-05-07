import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock de usuários para testar os 4 perfis sem backend
// Remova isso quando o auth.service.js estiver pronto
const MOCK_USERS = {
  "cidadao@teste.com":       { nome: "João Silva",     perfil: "cidadao",       email: "cidadao@teste.com" },
  "atendente@teste.com":     { nome: "Ana Costa",      perfil: "atendente",     email: "atendente@teste.com" },
  "gestor@teste.com":        { nome: "Carlos Mendes",  perfil: "gestor",        email: "gestor@teste.com" },
  "admin@teste.com":         { nome: "Herbert Santos", perfil: "administrador", email: "admin@teste.com" },
}
const MOCK_SENHA = "123456"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail]       = useState("")
  const [senha, setSenha]       = useState("")
  const [erro, setErro]         = useState("")
  const [loading, setLoading]   = useState(false)

  // Rotas de redirecionamento por perfil após login
  const REDIRECT = {
    cidadao:       "/home",
    atendente:     "/atendimento",
    gestor:        "/atendimento",
    administrador: "/home",
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")
    setLoading(true)

    // Simula delay de rede
    await new Promise(r => setTimeout(r, 800))

    const user = MOCK_USERS[email.toLowerCase()]

    if (!user || senha !== MOCK_SENHA) {
      setErro("E-mail ou senha incorretos.")
      setLoading(false)
      return
    }

    // Salva no AuthContext (token mock por enquanto)
    login(user, "mock-jwt-token-" + user.perfil)

    // Redireciona conforme o perfil
    navigate(REDIRECT[user.perfil] || "/home")
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-background-tertiary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      fontFamily: "'Geist Variable', sans-serif",
    }}>

      {/* Logo + título */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          width: "56px", height: "56px",
          borderRadius: "16px",
          background: "var(--color-text-primary)",
          color: "var(--color-background-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px", fontWeight: "700",
          margin: "0 auto 1rem",
          letterSpacing: "-1px",
        }}>
          CA
        </div>
        <h1 style={{
          fontSize: "22px", fontWeight: "500",
          color: "var(--color-text-primary)",
          margin: "0 0 4px",
        }}>
          Cidade Ativa
        </h1>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
          Gestão de ocorrências urbanas
        </p>
      </div>

      {/* Card do formulário */}
      <Card style={{ width: "100%", maxWidth: "380px" }}>
        <CardHeader style={{ paddingBottom: "8px" }}>
          <p style={{
            fontSize: "16px", fontWeight: "500",
            color: "var(--color-text-primary)", margin: 0,
          }}>
            Entrar na plataforma
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            <div>
              <label style={{
                fontSize: "13px", fontWeight: "500",
                color: "var(--color-text-secondary)",
                display: "block", marginBottom: "6px",
              }}>
                E-mail
              </label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label style={{
                fontSize: "13px", fontWeight: "500",
                color: "var(--color-text-secondary)",
                display: "block", marginBottom: "6px",
              }}>
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <p style={{
                fontSize: "13px",
                color: "var(--color-text-danger)",
                margin: 0,
                padding: "8px 12px",
                background: "var(--color-background-danger)",
                borderRadius: "var(--border-radius-md)",
              }}>
                {erro}
              </p>
            )}

            <Button type="submit" disabled={loading} style={{ marginTop: "4px" }}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

          </form>
        </CardContent>
      </Card>

      {/* Dica dos usuários de teste */}
      <Card style={{ width: "100%", maxWidth: "380px", marginTop: "16px" }}>
        <CardContent style={{ paddingTop: "12px" }}>
          <p style={{
            fontSize: "12px", fontWeight: "500",
            color: "var(--color-text-tertiary)",
            margin: "0 0 8px",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            Usuários de teste — senha: 123456
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {Object.values(MOCK_USERS).map(u => (
              <button
                key={u.email}
                type="button"
                onClick={() => { setEmail(u.email); setSenha(MOCK_SENHA); setErro("") }}
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--color-background-secondary)",
                  border: ".5px solid var(--color-border-tertiary)",
                  borderRadius: "var(--border-radius-md)",
                  padding: "8px 12px", cursor: "pointer",
                  transition: "background .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--color-background-tertiary)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--color-background-secondary)"}
              >
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>
                    {u.nome}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: 0 }}>
                    {u.email}
                  </p>
                </div>
                <Badge variant="secondary" style={{ fontSize: "11px", textTransform: "capitalize" }}>
                  {u.perfil}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", marginTop: "1.5rem" }}>
        Projeto Integrador V — Unifio 2026
      </p>
    </div>
  )
}
