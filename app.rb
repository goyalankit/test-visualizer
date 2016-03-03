require 'sinatra'

get '/:mp_name' do
  @mp_name = params[:mp_name]

  @name = ENV['USER']

  @test_data = [
    {class: "LoginViewTests", method: "testHappyPath", pass: 12, fail: 54, days: 40},
    {class: "ProfileViewTests", method: "testHappyPath", pass: 132, fail: 54, days: 40},
    {class: "SettingsViewTests", method: "testHappyPath", pass: 42, fail: 14, days: 40}
  ]
  erb :main
end

get '/:mp_name/:test_class/:test_method' do
  @mp_name = "cool"
  @test_data = []
  erb :class_test_method
end

get '/:mp_name/test_method' do

end

