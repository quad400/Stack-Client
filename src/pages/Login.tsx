import { SignIn } from "@clerk/clerk-react"


const Login = () => {
  return (
    <div className="min-h-screen flex w-full flex-col justify-center items-center">
        <div className="text-3xl md:text-5xl tracking-tighter font-semibold  text-neutral-900 mb-4">
            Welcome to Stack
        </div>
        <SignIn />
    </div>
  )
}

export default Login