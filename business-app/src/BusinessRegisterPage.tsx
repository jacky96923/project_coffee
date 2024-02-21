import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

export default function BusinessLoginPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handler for password input change
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  // Handler for confirm password input change
  const handleConfirmPasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmPassword(e.target.value);
  };

  // Form submission handler
// Form submission handler
const handleSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  const shopName = (document.getElementById('shopName') as HTMLInputElement).value;
  const Telnum = (document.getElementById('Telnum') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  if (password !== confirmPassword) {
    alert('密碼與確認密碼不相符！');
  } else {
    // Passwords match, log out the values and navigate to /BusinessLocation
    console.log('Shop Name: ' + shopName + ', Tel: ' + Telnum + ', Password: ' + password);

    navigate('/BusinessLocation');
  }
};


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            註冊你的咖啡店
          </h4>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {/* Shop Name Input */}
              <label htmlFor="shopName" className="block text-sm font-medium leading-6 text-gray-900">
                店舖名稱
              </label>
              <div className="mt-2">
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  autoComplete="shop-name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {/* Telephone Number Input */}
              <label htmlFor="Telnum" className="block text-sm font-medium leading-6 text-gray-900">
                聯繫電話
              </label>
              <div className="mt-2">
                <input
                  id="Telnum"
                  name="Telnum"
                  type="text"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {/* Password Input */}
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                密碼
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {/* Confirm Password Input */}
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                確認密碼
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {/* Submission Button */}
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #CB8A58, #562B1A)",
                  borderColor: "transparent"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #B07A4E, #4A2416)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(to right, #CB8A58, #562B1A)")}
              >
                下一步
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
