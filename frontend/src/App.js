import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age, city })
    });

    setName('');
    setEmail('');
    setAge('');
    setCity('');
    fetchUsers();
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

	<input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add User</button>
      </form>

      <hr />

      <h2>Users List</h2>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email} - {u.age} - {u.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;





