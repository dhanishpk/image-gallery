import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  // useState is used to initate the state. the the value inside the () is the default value
  // it returna an array of 2 value first one is the current state value
  // second one is the function to update it
  const [searchText, setSearchText] = useState('');
  const [images, setIsmages] = useState([]);

  const [loadingid, setLoadingId] = useState();

  const getSaveimage = async () => {
    try {
      const res = await axios.get(`${BASEURL}/images`);
      if (res.data) {
        console.log(res.data.result);
        setIsmages(res.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // this function called when there is a change in the second para meter which is an array. if it is [] emplty
  // it call once when page load
  useEffect(() => {
    getSaveimage();
  }, []);

  // this is how the data access from .env file
  //old way const accessKey = process.env.REACT_APP_UNSPLASH_API_ACCESSKEY;
  const BASEURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

  // this is how the event is handling click
  const handleSearchSubmitEvent = async (e) => {
    e.preventDefault();
    /*fetch(`${BASEURL}/new_image?word=${searchText}`, {
      headers: {},
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 1) {
          setIsmages([{ ...response, title: searchText }, ...images]);

          setSearchText('');
        } else {
          alert('No data');
        }
      })
      .catch((error) => console.error(error));*/

    // we are adding axios so fetch function is commend
    try {
      const res = await axios.get(`${BASEURL}/new_image?word=${searchText}`);
      if (res.data) {
        //console.log(res.data);

        res.data.save = false;

        setIsmages([{ ...res.data.result, title: searchText }, ...images]);
        console.log(images);
        //inserttheImagetoDb(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSaveImage = async (img) => {
    try {
      img.save = true;
      const res = await axios.post(`${BASEURL}/images`, img, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      if (res.data?.id) {
        setIsmages((prevImages) =>
          prevImages.map((image) =>
            image.id === img.id ? { ...image, save: true } : image,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteItem = async (deleteimg) => {
    setLoadingId(deleteimg.id);
    try {
      const res = await axios.delete(`${BASEURL}/images/${deleteimg.id}`, {
        headers: {
          'Content-Type': 'Authorization',
        },
      });

      if (res.data?.id) {
        setIsmages((images) => images.filter((item) => item !== deleteimg));
      }
      setLoadingId(null);
    } catch (error) {
      console.error(error);
      setLoadingId(null);
    }
  };

  return (
    <div className="App">
      <Header title="Photo Gallery" />
      <Search
        handleSubmit={handleSearchSubmitEvent}
        text={searchText}
        setText={setSearchText}
      />

      {/* 
      -&& operatro is used in react to check codition it is like simple if statement . if the left side value true then right par work .
      if the right part is false the value of left part will display
      - to hide the value of left part we use !! this operator  will convert the value to the boolean so it wont display at the front 
      */}
      <Container fluid="md" className="mt-4">
        {images.length > 0 ? (
          <Row xs={1} md={3} lg={4}>
            {!!images.length &&
              images.map((image, i) => (
                <Col key={i} className="pb-3">
                  <ImageCard
                    searchdImage={image}
                    handleDelete={onDeleteItem}
                    saveImage={onSaveImage}
                    loadingid={loadingid}
                  />
                </Col>
              ))}
          </Row>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="grow" role="status"></Spinner>
            <div>Search Image..</div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
