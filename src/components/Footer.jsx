export default function Footer(params) {
    return (
        <footer className="bg-gray-800 text-white text-center py-4">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Tu Compañía. Todos los derechos reservados.</p>
          </div>
        </footer>
      );
};
