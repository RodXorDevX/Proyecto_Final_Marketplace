import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/MenuCategorias.css';

function MenuCategorias({ onSelectCategory }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategorias(['all', ...res.data]))
      .catch(err => console.error('Error al obtener categorías', err));
  }, []);

  const handleCategoryClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    onSelectCategory(categoria);
  };

  return (
    <div className="menu-categorias">
      <h3>Categorías</h3>
      <ul>
        {categorias.map(categoria => (
          <li 
            key={categoria}
            className={categoria === categoriaSeleccionada ? 'active' : ''}
            onClick={() => handleCategoryClick(categoria)}
          >
            {categoria === 'all' ? 'Todas' : categoria}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuCategorias;
