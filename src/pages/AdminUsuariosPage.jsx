import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from '../data/api';

const formularioVacio = { username: '', email: '', password: '', role: 'CLIENTE' };

export function AdminUsuariosPage() {
  const { esAdmin, sesion } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargar = () => obtenerUsuarios().then(setUsuarios).catch((e) => setError(e.message));

  useEffect(() => {
    if (esAdmin) cargar();
  }, [esAdmin]);

  const guardar = async (event) => {
    event.preventDefault();
    setError('');
    setMensaje('');
    if (!editando && formulario.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    try {
      const datos = { ...formulario };
      if (editando) {
        await actualizarUsuario(editando, datos);
        setMensaje('Usuario actualizado correctamente.');
      } else {
        await crearUsuario(datos);
        setMensaje('Usuario creado correctamente.');
      }
      setFormulario(formularioVacio);
      setEditando(null);
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  };

  const quitar = async (usuario) => {
    if (usuario.email === sesion?.correo) {
      setError('No puedes eliminar tu propia cuenta de administrador.');
      return;
    }
    if (!window.confirm(`¿Eliminar al usuario ${usuario.username}?`)) return;
    setError('');
    setMensaje('');
    try {
      await eliminarUsuario(usuario.id);
      setMensaje('Usuario eliminado correctamente.');
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!esAdmin) return null;

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Administración</p>
      <h1 className="mb-1 text-3xl font-extrabold">Usuarios</h1>
      <p className="mb-4 text-gray-600">Sólo ADMINISTRADOR. Roles: ADMIN, VENDEDOR y CLIENTE.</p>

      <form
        onSubmit={guardar}
        className="mb-5 grid grid-cols-1 gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm min-[768px]:grid-cols-5"
      >
        <input
          aria-label="Nombre de usuario"
          autoComplete="username"
          placeholder="Usuario"
          value={formulario.username}
          onChange={(e) => setFormulario({ ...formulario, username: e.target.value })}
          required
        />
        <input
          aria-label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="Correo"
          value={formulario.email}
          onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
          required
        />
        <input
          aria-label="Contraseña"
          type="password"
          autoComplete="new-password"
          placeholder={editando ? 'Nueva contraseña (opcional)' : 'Contraseña (mín. 8)'}
          minLength={editando ? 1 : 8}
          value={formulario.password}
          onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
          required={!editando}
        />
        <select
          aria-label="Rol del usuario"
          value={formulario.role}
          onChange={(e) => setFormulario({ ...formulario, role: e.target.value })}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="VENDEDOR">VENDEDOR</option>
          <option value="CLIENTE">CLIENTE</option>
        </select>
        <div className="flex items-end gap-2">
          <button type="submit" className="flex-1 rounded-lg bg-orange-600 px-4 py-2 font-bold text-white transition hover:bg-orange-700">
            {editando ? 'Guardar' : 'Crear usuario'}
          </button>
          {editando && (
            <button
              type="button"
              onClick={() => { setEditando(null); setFormulario(formularioVacio); setError(''); }}
              className="rounded-lg border px-4 py-2 transition hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <p className="mb-4 text-xs text-gray-500">
        La contraseña se cifra con BCrypt y nunca se muestra ni se devuelve desde la API.
      </p>

      {mensaje && <p className="mb-3 rounded-md bg-sky-100 px-4 py-2 text-sky-900" role="status">{mensaje}</p>}
      {error && <p className="mb-3 rounded-md bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <table className="admin-table mb-0">
          <thead><tr><th>Usuario</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="font-semibold">{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-800">
                    {usuario.role.replace('ROLE_', '')}
                  </span>
                </td>
                <td className="whitespace-nowrap">
                  <button type="button" className="mr-2 text-orange-700 underline" onClick={() => {
                    setEditando(usuario.id);
                    setFormulario({ username: usuario.username, email: usuario.email, password: '', role: usuario.role.replace('ROLE_', '') });
                    setError('');
                    setMensaje('');
                  }}>Editar</button>
                  <button type="button" className="text-red-700 underline" onClick={() => quitar(usuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
