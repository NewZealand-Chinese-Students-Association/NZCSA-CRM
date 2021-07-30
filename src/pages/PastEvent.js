import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ProductListToolbar from '../components/product/ProductListToolbar';
import PastEventCard from '../components/product/PastEventCard';

const ProductList = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://nzcsa-backend.herokuapp.com/api/private/get-events-info')
        .then((res) => res.json())
        .then((data) => {
          const products = [];
          Object.entries(data).map(([key, product]) => {
            if (!product.isActive) {
              products.push(product);
            }
            return 0;
          });
          setCardInfo(products.reverse());
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search === '') {
      setCards(cardInfo);
    }
  }, [search, cardInfo]);

  function handleSearch(searchInfo) {
    setSearch(searchInfo);
    setCards(
      cardInfo.filter((element) =>
        element.eventName.toLowerCase().includes(searchInfo)
      )
    );
  }
  return (
    <>
      <Helmet>
        <title>Events | NZCSA</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar handleSearch={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {cards.map((product) => (
                <Grid key={product._id} item lg={4} md={6} xs={12}>
                  <PastEventCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 1
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
