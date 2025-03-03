import { useEffect } from 'react';
import './categories.css';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../api-service/product.service';
import Loading from '../loading/loading';

function Categories() {
    const { getAllCategories, isLoading, categories } = ProductService();
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, []);

    const onExplore = (id, name) => {
        navigate(`/products/${name}`, { state: { categoryId: id } });
    };

    return (
        <section className="banner-container">
            <h1>Explora el bienestar por categorías</h1>

            {isLoading && <Loading />}

            {
                categories.map((category) => {
                    return (
                        <div className="banner" key={category.id}>
                            <img src={`../../categories/${category.imageUrl}`} alt="" />
                            <div className="b-content">
                                <h3>{category.categoryName}</h3>
                                <p>{category.description}</p>
                                <button onClick={() => onExplore(category.id, category.categoryName)}>Explorar ahora</button>
                            </div>
                        </div>
                    );
                })
            }
        </section>
    );
}

export default Categories;
