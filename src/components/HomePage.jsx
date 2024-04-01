import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/apiCallingFunction';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import '../styles/style.css';
import SearchPage from './SearchPage';

const HomePage = () => {
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedProduct(products[newValue].image);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts.slice(0, 10));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <h2 className='heading'>Shopping Products</h2>
            <SearchPage/>
            <Box >
                {products.length > 0 && (
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="scrollable force tabs example"
                        >
                            {products.map((product, index) => (
                                <Tab key={index} label={product.title} />
                            ))}
                        </Tabs>
                        <div className="card-container">
                            {selectedProduct && (
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={selectedProduct}
                                            alt="Selected Product"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {products[value].title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {products[value].description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </Box>
        </>
    );
}

export default HomePage
