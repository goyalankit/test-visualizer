require 'sinatra'

get '/:mp_name/?' do
  @mp_name = params[:mp_name]

  @test_data = [
    {class: "LoginViewTests", method: "testHappyPath", pass: 12, fail: 54, days: 40},
    {class: "ProfileViewTests", method: "testHappyPath", pass: 132, fail: 54, days: 40},
    {class: "SettingsViewTests", method: "testHappyPath", pass: 42, fail: 14, days: 40}
  ]
  erb :main
end

get '/:mp_name/:test_class/:test_method/?' do
  @mp_name = params[:mp_name]
  @test_data = [
    {date: "2016-23-12", passed: 45, failed: 32},
    {date: "2016-23-11", passed: 13, failed: 21},
    {date: "2016-23-10", passed: 33, failed: 12},
    {date: "2016-23-09", passed: 53, failed: 45},
  ]
  erb :class_test_method
end

get '/?' do
  erb :index
end

get '/:mp_name/test_method' do

end

