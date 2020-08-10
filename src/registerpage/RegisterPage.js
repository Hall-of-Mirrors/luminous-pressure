/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import Footer from "../components/Footer/Footer.js";
import Validation from "../components/Validation/Validation.js";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidEmail: true,
      isValidPassword: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  componentDidMount() {
    // document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    // document.body.classList.toggle("register-page");
  }
  
  render() {
    const isValidEmail = this.state.isValidEmail
    let error;
    if (isValidEmail) {
      error = <Validation color="success" value='Shit Checks Out' />
    } else {
      error =  <Validation color="danger" value='Invalid Email Format' />
    }
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-3 offset-md-3" lg="5" md="6">
                    <Card className="card-register">
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="text"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                            />
                          </InputGroup>
                          {error}
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="text"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
                        </Form>
                        <Button className="btn-round" color="primary" size="lg">
                          Get Started
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default RegisterPage;
