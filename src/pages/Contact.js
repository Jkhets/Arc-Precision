import  { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { saveEnquiry } from '../utils/saveEnquiry'; 


const ContactContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 60px 24px;
  max-width: 800px;
  margin: 40px auto;
  background-color: #f9f9f9;
  color: #1a1b1f;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
`;

const Inner = styled.div`
  padding: 36px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Intro = styled.p`
  color: #333;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #111;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #bcbcbc;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.02);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  min-height: 140px;
  resize: vertical;

  &:focus {
    border-color: #bcbcbc;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.02);
  }
`;

const SubmitButton = styled.button`
  background-color: #1a1b1f;
  color: #fff;
  padding: 12px 18px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 6px;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: #1f7a1f;
  background: #ecf8ed;
  border: 1px solid #d6f1d6;
  padding: 10px 12px;
  border-radius: 6px;
  margin-top: 16px;
`;

const ErrorMessage = styled.p`
  color: #9b1f1f;
  background: #f9eaea;
  border: 1px solid #f3d6d6;
  padding: 10px 12px;
  border-radius: 6px;
  margin-top: 16px;
`;


const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await saveEnquiry(formData);
      setSubmitting(false);

      if (result?.error) {
        console.error('Supabase error:', result.error);
        setError('Something went wrong sending your message. Please try again later.');
        return;
      }

      setSuccess('Thank you — your message has been received. We will get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Header />
      <MainContent>
        <Inner>
          <Title>Contact Us</Title>
          <Intro>
            Have a question or a request? Drop us a message and we’ll reply as soon as possible.
          </Intro>

          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-required="true"
              />
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-required="true"
              />
            </Field>

            <Field>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                aria-required="true"
              />
            </Field>

            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message'}
            </SubmitButton>

            {success && <SuccessMessage role="status">{success}</SuccessMessage>}
            {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
          </Form>
        </Inner>
      </MainContent>
      <Footer />
    </ContactContainer>
  );
};

export default Contact;
