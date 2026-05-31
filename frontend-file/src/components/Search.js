import { Form, Col, Row, Button, Container } from "react-bootstrap";

const searchBarStyle = {
  backgroundColor: "#cccccc85",
};

const Search = ({handleSubmit,text,setText}) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={6} style={searchBarStyle} className="py-2"> 
          <Form>
            <Row>
              <Col xs={10}>
                <Form.Control placeholder="Search New Images" 
                value={text}
                onChange={(e)=>{
                  setText(e.target.value);
                }}
                
                />
              </Col>
              <Col xs={2}>
                <Button type="submit" className="primary" onClick={handleSubmit}> 
                  
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
