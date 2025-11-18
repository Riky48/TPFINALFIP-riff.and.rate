const API_URL = 'http://localhost:3000/auth';

export const registerUser = async (userData: any) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Error en el registro');
        }

        return await res.json();
    } catch (err) {
        console.error('Error during registration:', err);
        return { error: 'No se pudo conectar al servidor.' }
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Error en el login');
        }
        return await res.json();

    } catch (err) {
        console.error('Error al conectar con el backend:', err);
        return { error: 'No se pudo conectar al servidor.' }
    }
}

