// src/pages/Home.jsx

function Home() {
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        width: '312%',              // Occupies full width
        backgroundColor: '#fce4ec', // Pink background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        textAlign: 'center'        // Center text
      }}
    >
      <h1 
        style={{ 
          fontSize: '4rem', 
          color: '#d81b60',
          marginBottom: '20px'
        }}
      >
        Simple Task
      </h1>

      <p style={{ color: '#880e4f', fontSize: '1.3rem', marginBottom: '40px' }}>
        A clean and efficient way to manage your tasks!
      </p>

      <div>
        <a 
          href="/login"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#ec407a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            fontWeight: 'bold'
          }}
        >
          Log In
        </a>
        <a 
          href="/register"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#ab47bc',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default Home
