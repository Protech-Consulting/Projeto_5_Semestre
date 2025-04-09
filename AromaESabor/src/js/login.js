document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log(`teste`)
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';
    
    try {
        // Substitua pela URL real do seu endpoint de login
        const apiUrl = 'http://localhost:8000/api/users/login';
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Adicione outros headers necessários aqui
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }
        
        // Login bem-sucedido
        messageDiv.textContent = 'Login realizado com sucesso!';
        messageDiv.className = 'success';
        messageDiv.style.display = 'block';
        
        // Armazena o token (se a API retornar um)
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            // Redireciona para a página protegida ou atualiza a UI
            // window.location.href = '/dashboard.html';
        }
        
        console.log('Resposta da API:', data);
        
    } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
        console.error('Erro:', error);
    }
});