import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias,
} from '../data/api';

export function AdminCategoriasPage() {
  const { esAdmin } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', descripcion: '' });
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');

  const cargar = () => obtenerCategorias().then(setCategorias).catch((e) => setError(e.message));

  useEffect(() => {
    if (esAdmin) cargar();
  }, [esAdmin]);

  const guardar = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (editando) await actualizarCategoria(editando, formulario);
      else await crearCategoria(formulario);
      setFormulario({ nombre: '', descripcion: '' });
      setEditando(null);
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  };

  const quitar = async (categoria) => {
    if (!window.confirm(`¿Eliminar la categoría ${categoria.nombre}?`)) return;
    try {
      await eliminarCategoria(categoria.id);
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!esAdmin) return null;

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Administración</p>
      <h1 className="mb-1 text-3xl font-extrabold">Categorías</h1>
      <p className="mb-4 text-gray-600">Sólo ADMINISTRADOR. Las categorías se asocian a los productos.</p>
      <Link to="/admin" className="mb-4 inline-block text-orange-700 underline">Volver al panel</Link>

      <form onSubmit={guardar} className="mb-5 flex flex-wrap gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <input placeholder="Nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} required />
        <input placeholder="Descripción" value={formulario.descripcion} onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })} />
        <button type="submit" className="rounded-lg bg-orange-600 px-4 py-2 font-bold text-white">{editando ? 'Guardar' : 'Crear categoría'}</button>
        {editando && <button type="button" onClick={() => { setEditando(null); setFormulario({ nombre: '', descripcion: '' }); }} className="rounded-lg border px-4 py-2">Cancelar</button>}
      </form>

      {error && <p className="mb-3 rounded-md bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <table className="admin-table mb-0">
          <thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td className="font-semibold">{categoria.nombre}</td>
                <td>{categoria.descripcion || '—'}</td>
                <td className="whitespace-nowrap">
                  <button type="button" className="mr-2 text-orange-700 underline" onClick={() => {
                    setEditando(categoria.id);
                    setFormulario({ nombre: categoria.nombre, descripcion: categoria.descripcion ?? '' });
                  }}>Editar</button>
                  <button type="button" className="text-red-700 underline" onClick={() => quitar(categoria)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
