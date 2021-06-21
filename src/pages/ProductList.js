import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';

const ProductList = () => {
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://nzcsa-backend.herokuapp.com/api/private/get-events-info')
        .then((res) => res.json()).then((data) => {
          setCardInfo(data);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {Object.entries(cardInfo).map(([key, product]) => (
                <Grid
                  item
                  key={key}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
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
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
