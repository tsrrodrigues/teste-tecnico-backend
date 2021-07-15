module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Medipreço API',
    description: 'API para obtenção de estatísticas sobre o Campeonato Brasileiro'
  },
  servers: [
    {
      url: 'http://localhost:3000/v1',
      description: 'Local'
    }
  ],
  tags: [
    {
      name: 'Championship'
    }
  ],
  paths: {
    '/winners-teams': {
      get: {
        tags: ['Championship'],
        description: 'Busca os times com mais de dois títulos brasileiros',
        operationId: 'getWinnersTeams',
        parameters: [
          {
            name: 'minimumNumberOfWins',
            in: 'query',
            description: 'Número mínimos de vitórias',
            schema: {
              type: 'integer',
              example: 2,
            },
            required: false,
            default: 2
          }
        ],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'array',
                      description: 'Resultado da operação',
                      items: {
                        type: 'string',
                        description: 'Nome do time retornado'
                      }
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: [
                    "Bahia",
                    "Palmeiras",
                    "Santos",
                    "Cruzeiro",
                    "Botafogo",
                    "Fluminense",
                    "Atlético",
                    "Vasco",
                    "Internacional",
                    "São",
                    "Flamengo",
                    "Grêmio",
                    "Corinthians"
                  ],
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    },
    '/most-gunners-team': {
      get: {
        tags: ['Championship'],
        description: 'Busca o time com mais artilheiros em todos os campeonatos',
        operationId: 'getMostGunnersTeam',
        parameters: [],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'string',
                      description: 'Nome do time retornado'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: "Santos",
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    },
    '/top-gunners': {
      get: {
        tags: ['Championship'],
        description: 'Busca os cinco principais artilheiros em todos os campeonatos',
        operationId: 'getTopGunners',
        parameters: [
          {
            name: 'top',
            in: 'query',
            description: 'Muda a quantidade de artilheiros retornados, ranqueando-os sempre do melhor para o pior.',
            schema: {
              type: 'integer',
              example: 5,
            },
            required: false,
            default: 5
          }
        ],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'array',
                      description: 'Resultado da operação',
                      items: {
                        type: 'string',
                        description: 'Nome do artilheiro e seu respectivo time'
                      }
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: [
                    "Washington (Atlético Paranaense)",
                    "Dimba (Goiás)",
                    "Edmundo (Vasco da Gama)",
                    "Reinaldo (Atlético Mineiro)",
                    "Guilherme (Atlético Mineiro)"
                  ],
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    },
    '/most-vice-team': {
      get: {
        tags: ['Championship'],
        description: 'Busca o time com mais vice-campeonatos da história',
        operationId: 'getMostViceTeam',
        parameters: [],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'string',
                      description: 'Nome do time retornado'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: "Santos",
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    },
    '/best-winless-teams': {
      get: {
        tags: ['Championship'],
        description: 'Busca os times que mais ficaram classificados entre os quatro primeiros colocados, porém nunca venceram o campeonato brasileiro',
        operationId: 'getWinlessTeams',
        parameters: [],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'array',
                      description: 'Resultado da operação',
                      items: {
                        type: 'string',
                        description: 'Nome do time retornado'
                      }
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: [
                    "Vasco da Gama",
                    "Fortaleza",
                    "Santa Cruz",
                    "America",
                    "Náutico",
                    "Ceará",
                    "Atlético Mineiro",
                    "São Paulo",
                    "Operário",
                    "Londrina",
                    "Ponte Preta",
                    "Atlético Paranaense",
                    "Bangu",
                    "Brasil de Pelotas",
                    "Bragantino",
                    "Vitória",
                    "Portuguesa",
                    "Goiás",
                    "São Caetano"
                  ],
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    },
    '/gunners': {
      get: {
        tags: ['Championship'],
        description: 'Busca os artilheiros que possuem determinada quantidade de gols',
        operationId: 'getGunners',
        parameters: [
          {
            name: 'numberOfGoals',
            in: 'query',
            description: 'Quantidade de gols desejados para a filtragem de artilheiros do campeonato',
            schema: {
              type: 'integer',
              example: 10
            },
            required: true
          }
        ],
        responses: {
          '200': {
            description: 'Busca realizada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'array',
                      description: 'Resultado da operação',
                      items: {
                        type: 'string',
                        description: 'Nome do artilheiro e seu respectivo time'
                      }
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    },
                    success: {
                      type: 'boolean',
                      description: 'Identificador de sucesso da operação'
                    }
                  }
                },
                example: {
                  success: true,
                  result: [
                    "Alcindo (Grêmio)",
                    "Bita (Náutico)",
                    "Toninho Guerreiro (Santos)",
                    "Müller (São Paulo)"
                  ],
                  transaction: "1c14fb03a9fb9b6f4b"
                }
              }
            }
          },
          '400': {
            description: 'Requisição incorreta',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Parameter numberOfGoals is missing"
                },
              }
            }
          },
          '500': {
            description: 'Algo deu errado na operação',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      description: 'Mensagem de erro da operação'
                    },
                    transaction: {
                      type: 'string',
                      description: 'Transação da operação'
                    }
                  }
                },
                example: {
                  transaction: "5112264284063113ab",
                  error: "Something went wrong, try again later."
                },
              }
            }
          }
        }
      }
    }
  }
};