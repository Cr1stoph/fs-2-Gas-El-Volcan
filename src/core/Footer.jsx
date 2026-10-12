export function Footer() {
  return (
    <footer className="mt-auto border-t border-orange-950 bg-gray-900 py-7 text-center text-sm text-gray-300">
      <div className="mx-auto max-w-[1600px] px-4">
        <p className="mb-1 font-semibold">&copy; {new Date().getFullYear()} Distribuidora de gas El Volcán.</p>
        <p className="mb-0 text-xs text-orange-300">Servicio local para Chillán y la Región de Ñuble</p>
      </div>
    </footer>
  );
}