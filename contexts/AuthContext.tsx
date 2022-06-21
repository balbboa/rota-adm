import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import Router from 'next/router';
import { createContext, useState } from "react";


type SignInData = {
  cpf: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  async function signIn({ cpf, password }: SignInData) {
    try {
      await axios.get('https://treinamento.rota.pm.rn.gov.br/sanctum/csrf-cookie').then(response => {
        axios.post(`https://treinamento.rota.pm.rn.gov.br/api/login`, { cpf, password }).then(res => {
          localStorage.setItem('auth_token', res.data.data.token);
          setIsAuthenticated(true)
          setToken(res.data.data.token)
          Router.push('/dashboard')

        }).catch(err => {
          setOpen(true)
          console.log('post error: ', err)
        })
      });
    } catch (err) {
      setOpen(true)
      console.log(err)
    }
  }

  function signOut() {
    localStorage.clear();
    setIsAuthenticated(false)
    setToken('')
    Router.push('/')
    sessionStorage.clear()
  }

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
        {children}
      </AuthContext.Provider>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
          Usuário ou Senha inválido!
        </Alert>
      </Snackbar>
    </>
  )
}