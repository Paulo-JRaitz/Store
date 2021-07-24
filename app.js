const http = require('http');
const url = require('url');
const fs = require('fs');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const pathUndefined = './Users/Alunoundefined.json';
function deletar() {
  if (fs.existsSync(pathUndefined)) {
    fs.unlinkSync(pathUndefined, (error) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log('Foi pro saco!');
    });
  }
}

const server = http.createServer((request, response) => {
  const urlPathName = url.parse(request.url, true);
  const params = queryString.parse(urlPathName.search);
  const pathUser = `${filePath}Aluno${params.Id}.json`;
  const filePath = './Users/';
  const fileExists = fs.existsSync(pathUser);

  if (urlPathName.pathname == '/create-user/') {
    fs.writeFileSync(pathUser, JSON.stringify({ Aluno: params, CreatedeByUrl: request.url }), (error) => {
      if (error) {
        throw error;
      }
      deletar();
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end(JSON.stringify({ Alunos: params }));
  }

  else if (urlPathName.pathname == '/select-user/') {
    if (!fileExists) {
      response.end(JSON.stringify({ message: 'Este usuario nao encontrado' }));
    }
    else {
      dados = fs.readFileSync(pathUser, function Data(error, data) {
        return data;
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.end(dados);
    }
  }

  else if (urlPathName == '/delet-user/') {
    if (!fileExists) {
      response.end(JSON.stringify({ message: 'Este usuario nao encontrado' }));
    }
    fs.unlinkSync(pathUser, (error) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.end(JSON.stringify({ message: 'Foi pro saco!' }));
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
