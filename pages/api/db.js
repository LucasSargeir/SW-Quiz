import db from '../../db.json';

export default function dbHandler(request, response) {
  if (request.method === 'OPTIONS') {
    return response.status(200).end;
  }

  response.setHeader('Acess-Control-Allow-Credentials', true);
  response.setHeader('Acess-Control-Allow-Origin', '*');
  response.setHeader('Acess-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');

  return response.json(db);
}
