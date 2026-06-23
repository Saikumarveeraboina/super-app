import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const existingUser = useStore((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [shareData, setShareData] = useState(false);

  // Redirect if already registered
  React.useEffect(() => {
    if (existingUser) {
      navigate('/categories');
    }
  }, [existingUser, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!shareData) {
      newErrors.shareData = 'Check this if you want to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUser({
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
      });
      navigate('/categories');
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-left">
        <div className="registration-image-wrapper">
          <img
            src="/images/registration-bg.png"
            alt="Concert"
            className="registration-bg-img"
          />
          <div className="registration-overlay"></div>
          <div className="registration-left-text">
            <h1>
              Discover new things on{' '}
              <span className="highlight-app">Superapp</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="registration-right">
        <div className="registration-form-container">
          <h2 className="green-logo">Super app</h2>
          <p className="registration-subtitle">Create your new account</p>

          <form onSubmit={handleSubmit} className="registration-form" noValidate>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                id="input-name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="UserName"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'input-error' : ''}
                id="input-username"
              />
              {errors.username && (
                <span className="error-text">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                id="input-email"
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={errors.mobile ? 'input-error' : ''}
                id="input-mobile"
              />
              {errors.mobile && (
                <span className="error-text">{errors.mobile}</span>
              )}
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label" id="share-data-label">
                <input
                  type="checkbox"
                  checked={shareData}
                  onChange={(e) => {
                    setShareData(e.target.checked);
                    if (errors.shareData) {
                      setErrors((prev) => ({ ...prev, shareData: '' }));
                    }
                  }}
                  id="checkbox-share"
                />
                <span className="checkmark"></span>
                Share my registration data with Superapp
              </label>
              {errors.shareData && (
                <span className="error-text">{errors.shareData}</span>
              )}
            </div>

            <button type="submit" className="btn-signup" id="btn-signup">
              SIGN UP
            </button>
          </form>

          <p className="terms-text">
            By clicking on Sign up, you agree to Superapp{' '}
            <a href="#" className="link-green">
              Terms and Conditions of Use
            </a>
          </p>
          <p className="terms-text">
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp{' '}
            <a href="#" className="link-green">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
