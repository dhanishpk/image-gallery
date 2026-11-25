import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const ImageCard = ({ searchdImage, handleDelete, saveImage, loadingid }) => {
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
        <Card.Title>{searchdImage?.title}</Card.Title>
        <Card.Text>
          {searchdImage.alt_description || searchdImage.description}
        </Card.Text>

        <Row className="ß-content-center ">
          <Col xs={6} className="py-1 px-2">
            {' '}
            <Button
              variant="primary"
              className="w-100 "
              onClick={() =>
                !(loadingid === searchdImage.id)
                  ? handleDelete(searchdImage)
                  : ''
              }
            >
              {loadingid === searchdImage.id ? (
                <Spinner animation="grow" variant="info" size="sm" />
              ) : (
                'Delete'
              )}
            </Button>
          </Col>
          <Col xs={6} className="py-1 px-2">
            {' '}
            {!searchdImage?.save && (
              <Button
                variant="primary"
                className="w-100"

                onClick={() => saveImage(searchdImage)}
              >
                Save
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default ImageCard;
