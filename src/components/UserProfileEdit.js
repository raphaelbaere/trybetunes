import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class UserProfileEdit extends Component {
  state = {
    loading: false,
    editInputName: '',
    editInputEmail: '',
    editInputDescription: '',
    editInputImage: '',
    isEditProfileButtonDisabled: false,
    redirect: false,
  };

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loading: true });
    const userProfile = await getUser();
    const { name, email, description, image } = userProfile;
    this.setState({
      editInputName: name,
      editInputEmail: email,
      editInputDescription: description,
      editInputImage: image,
      loading: false,
    });
  };

  validateForm = () => {
    const { editInputName,
      editInputEmail,
      editInputImage, editInputDescription } = this.state;
    const emailVerify = editInputEmail.split('@')[1] === 'test.com' || 'email.com';
    if (editInputName && emailVerify && editInputImage && editInputDescription) {
      this.setState({ isEditProfileButtonDisabled: false });
    }
  };

  onInputChange = ({ target }) => {
    const {
      editInputName,
      editInputEmail,
      editInputDescription,
      editInputImage } = this.state;
    const checkInputName = editInputName.length > 0;
    const checkInputEmail = editInputEmail.length > 0;
    const checkInputDescription = editInputDescription.length > 0;
    const checkInputImage = editInputImage.length > 0;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
    if (!checkInputName
      && !checkInputEmail && !checkInputDescription && !checkInputImage) {
      this.setState({
        isEditProfileButtonDisabled: true,
      });
    }
    if (checkInputName && checkInputEmail && checkInputDescription && checkInputImage) {
      this.setState({
        isEditProfileButtonDisabled: false,
      });
    }
  };

  onEditProfileButtonClick = async () => {
    const {
      editInputName,
      editInputEmail,
      editInputDescription,
      editInputImage } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name: editInputName,
      email: editInputEmail,
      description: editInputDescription,
      image: editInputImage,
    });
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const { loading,
      editInputName,
      editInputEmail,
      editInputDescription,
      editInputImage,
      isEditProfileButtonDisabled,
      redirect } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form onSubmit={ (event) => event.preventDefault() }>
            <label htmlFor="edit-input-name">
              Nome
              <input
                id="edit-input-input"
                data-testid="edit-input-name"
                type="text"
                name="editInputName"
                value={ editInputName }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="edit-input-email">
              Email
              <input
                data-testid="edit-input-email"
                id="edit-input-email"
                type="text"
                name="editInputEmail"
                value={ editInputEmail }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="edit-input-description"
                name="editInputDescription"
                value={ editInputDescription }
                onChange={ this.onInputChange }
              />
              <label htmlFor="edit-input-image">
                Imagem
                <input
                  id="edit-input-image"
                  data-testid="edit-input-image"
                  type="text"
                  name="editInputImage"
                  value={ editInputImage }
                  onChange={ this.onInputChange }
                />
              </label>
            </label>
            <button
              disabled={ isEditProfileButtonDisabled }
              onClick={ this.onEditProfileButtonClick }
              type="button"
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>)}
        { redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}
