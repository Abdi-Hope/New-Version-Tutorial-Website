import React from 'react';

const SystemSettings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* General Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">General Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Site Name</label>
                  <p className="text-sm text-gray-600">Display name of your platform</p>
                </div>
                <input 
                  type="text" 
                  defaultValue="AE Platform"
                  className="border rounded-lg px-3 py-2 w-64"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Site URL</label>
                  <p className="text-sm text-gray-600">Your platform's base URL</p>
                </div>
                <input 
                  type="text" 
                  defaultValue="https://aeplatform.com"
                  className="border rounded-lg px-3 py-2 w-64"
                />
              </div>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium mb-4">Maintenance</h2>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Maintenance Mode</label>
                <p className="text-sm text-gray-600">Temporarily disable public access</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium mb-4">Security</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">User Registration</label>
                  <p className="text-sm text-gray-600">Allow new users to register</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Email Verification</label>
                  <p className="text-sm text-gray-600">Require email verification</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t pt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
