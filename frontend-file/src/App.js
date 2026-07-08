import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const App = () => {
  // useState is used to initate the state. the the value inside the () is the default value
  // it returna an array of 2 value first one is the current state value
  // second one is the function to update it
  const [searchText, setSearchText] = useState('');
  const [images, setIsmages] = useState([]);

  // this is how the data access from .env file
  const accessKey = process.env.REACT_APP_UNSPLASH_API_ACCESSKEY;

  // this is how the event is handling click
  const handleSearchSubmitEvent = (e) => {
    e.preventDefault();
    fetch(`https://api.unsplash.com/photos/random?query=${searchText}`, {
      headers: {
        'User-Agent': 'the-odin-project',
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsmages([{ ...response, title: searchText }, ...images]);

        setSearchText('');
      })
      .catch((error) => console.error(error));
  };

  const onDeleteItem = (deleteimg) => {
    console.log('Hello Delete' + deleteimg.title);
    setIsmages((images) => images.filter((item) => item !== deleteimg));
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
        <Row xs={1} md={3} lg={4}>
          {!!images.length &&
            images.map((image, i) => (
              <Col key={i} className="pb-3">
                <ImageCard searchdImage={image} handleDelete={onDeleteItem} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;
