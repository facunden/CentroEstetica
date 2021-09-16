export class appSettings{
  public static API_URI = 'http://localhost:3000';
  // public static API_URI = 'https://gestiones-app.herokuapp.com';

  public static token = localStorage.getItem('token');
  public static userId = localStorage.getItem('userId');
}
