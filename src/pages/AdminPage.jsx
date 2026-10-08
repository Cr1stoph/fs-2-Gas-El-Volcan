export function AdminPage() {
  return (
    <>
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenida, Administradora 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Control de despacho y ventas activas en Chillán.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Sistema en línea
          </span>
          <button
            type="button"
            className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-orange-700"
          >
            + Nuevo Pedido Manual
          </button>
        </div>
      </header>

      <section
        aria-label="Indicadores del negocio"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <article className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Ventas de hoy
            </p>
            <p className="mt-1 text-2xl font-black text-gray-900">$185.000</p>
          </div>
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl"
            aria-hidden="true"
          >
            💰
          </span>
        </article>
      </section>
    </>
  );
}
