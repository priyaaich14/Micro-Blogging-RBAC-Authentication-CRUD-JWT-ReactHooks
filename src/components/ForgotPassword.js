export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          await axios.post('http://localhost:3070/api/users/forgot-password', { email })
          toast('Reset link sent to your email')
      } catch (err) {
          if (err.response && err.response.data.errors) {
              setErrors({ email: err.response.data.errors[0].msg })
          } else {
              setErrors({ email: 'An error occurred during password reset' })
          }
      }
  }

  return (
      <div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              /> <br />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <input type="submit" />
          </form>
      </div>
  )
}
