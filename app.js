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
  const filePath = './Users/';

  if (urlPathName.pathname == '/create-user/') {
    fs.writeFileSync(`${filePath}Aluno${params.Id}.json`, JSON.stringify({ Aluno: params, CreatedeByUrl: request.url }), (error) => {
      if (error) {
        throw error;
      }
      deletar();
    });
    response.statusCode = 201;
    response.statusMessage;
    response.setHeader('Content-Type', 'text/plain');
    response.end(JSON.stringify({ Alunos: params }));
  }

  else if (urlPathName.pathname == '/select-user/') {
    if (!fs.existsSync(`${filePath}Aluno${params.Id}.json`, (error) => { throw error })) {
      response.statusCode = 404;
      response.end(JSON.stringify({ message: 'Este usuario nao encontrado' }));
    }
    else {
      dados = fs.readFileSync(`${filePath}Aluno${params.Id}.json`, function Data(error, data) {
        return data;
      });
      response.statusCode = 302;
      response.statusMessage;
      response.setHeader('Content-Type', 'text/plain');
      response.end(dados);
    }
  }

  else if (urlPathName.pathname == '/delet-user/') {
    if (!fs.existsSync(`${filePath}Aluno${params.Id}.json`, (error) => { throw error })) {
      response.end(JSON.stringify({ message: 'Este usuario nao encontrado' }));
    }
    else {
      fs.unlinkSync(`${filePath}Aluno${params.Id}.json`);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.end(JSON.stringify({
        message: 'Usuário Deletado'
      }));
    }
  }
  else {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end(JSON.stringify({
      message: 'Nada aqui, ainda!'
    }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
