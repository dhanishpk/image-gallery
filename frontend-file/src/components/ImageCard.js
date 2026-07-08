import { Card, Button } from 'react-bootstrap';

const ImageCard = ({ searchdImage, handleDelete }) => {
  console.log(searchdImage);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img
          src={searchdImage.urls.small}
          style={{
            height: '300px',
            width: '100%' /* Fills the card width completely */,
            objectFit:
              'cover' /* Crops the image smartly without stretching it */,
            overflow: 'hidden',
          }}
        />
        <Card.Title>{searchdImage.title}</Card.Title>
        <Card.Text>
          {searchdImage.description || searchdImage.alt_description}
        </Card.Text>
        <Button variant="primary" onClick={() => handleDelete(searchdImage)}>
          {' '}
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ImageCard;
