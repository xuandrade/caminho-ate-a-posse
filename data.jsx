// TOGA — modelo de dados, defaults, helpers

const INITIAL_SUBJECTS_OBJ = [
  {
    "id": "constitucional",
    "name": "Direito Constitucional",
    "shortName": "Const",
    "weight": 1,
    "topics": [
      { "id": "constitucional-4",           "name": "Controle de Constitucionalidade",        "lei": false, "doutrina": false, "juris": true,  "questoes": true,  "revisao": false },
      { "id": "constitucional-1",           "name": "Direitos e Garantias Fundamentais",      "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "constitucional-1775487057252","name": "Educação",                              "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "constitucional-8",           "name": "Ordem Social",                           "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "constitucional-1775484998989","name": "Saúde",                                 "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "constitucional-7",           "name": "Constitucionalismo",                     "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": true  },
      { "id": "constitucional-0",           "name": "NFPSS",                                  "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "constitucional-2",           "name": "Organização do Estado",                  "lei": true,  "doutrina": false, "juris": false, "questoes": true,  "revisao": false },
      { "id": "constitucional-3",           "name": "Organização dos Poderes",                "lei": true,  "doutrina": false, "juris": false, "questoes": true,  "revisao": false },
      { "id": "constitucional-5",           "name": "Defesa do Estado e Instituições Democráticas", "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "constitucional-1774895898245","name": "Direitos Políticos",                   "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "constitucional-9",           "name": "Remédios Constitucionais",               "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "constitucional-6",           "name": "Jurisprudência 2026",                    "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "constitucional-1775484884182","name": "Hermenêutica Constitucional",           "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "administrativo",
    "name": "Direito Administrativo",
    "shortName": "Admin",
    "weight": 1,
    "topics": [
      { "id": "administrativo-0",           "name": "Poderes da Administração Pública",       "lei": true,  "doutrina": true,  "juris": false, "questoes": true,  "revisao": false },
      { "id": "administrativo-4",           "name": "Servidores Públicos",                    "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "administrativo-2",           "name": "Atos Administrativos",                   "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-8",           "name": "Intervenção do Estado na Propriedade",   "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "administrativo-5",           "name": "Responsabilidade Civil do Estado",       "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "administrativo-1775744889959","name": "Improbidade administrativa",            "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "administrativo-6",           "name": "Serviços Públicos",                      "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-1",           "name": "Organização Administrativa",              "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-3",           "name": "Licitações e Contratos",                 "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-7",           "name": "Bens Públicos",                          "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-9",           "name": "Processo Administrativo",                "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "administrativo-1774898514584","name": "Jurisprudência 2026",                   "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "civil",
    "name": "Direito Civil",
    "shortName": "Civil",
    "weight": 1,
    "topics": [
      { "id": "civil-8",           "name": "Família",                     "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "civil-9",           "name": "Sucessões",                   "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "civil-3",           "name": "EPCD",                        "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "civil-7",           "name": "Direitos Reais",              "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "civil-0",           "name": "LINDB",                       "lei": true,  "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-4",           "name": "Obrigações",                  "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-5",           "name": "Contratos",                   "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-6",           "name": "Responsabilidade Civil",      "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-1",           "name": "Pessoas Naturais e Jurídicas","lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-2",           "name": "Bens",                        "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "civil-1774898301503","name": "Jurisprudência 2026",        "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "processo-civil",
    "name": "Direito Processual Civil",
    "shortName": "P. Civil",
    "weight": 1,
    "topics": [
      { "id": "processo-civil-0",           "name": "Normas Fundamentais do CPC",     "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-civil-1",           "name": "Jurisdição e Competência",       "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-2",           "name": "Sujeitos do Processo",           "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-6",           "name": "Cumprimento de Sentença",        "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-civil-7",           "name": "Execução",                       "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-civil-3",           "name": "Atos Processuais",               "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-4",           "name": "Tutela Provisória",              "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-8",           "name": "Recursos",                       "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-9",           "name": "Incidentes Processuais",         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "processo-civil-1774897483674","name": "Honorários Advocatícios",       "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-5",           "name": "Procedimento Comum",             "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-1774897493927","name": "Jurisprudência 2026 (até 11/04)","lei": true, "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "processo-civil-1774897501453","name": "Súmulas",                       "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-civil-1774898111551","name": "Coisa Julgada",                 "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "penal",
    "name": "Direito Penal",
    "shortName": "Penal",
    "weight": 1,
    "topics": [
      { "id": "penal-0",           "name": "Princípios do Direito Penal",       "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "penal-8",           "name": "Crimes contra o Patrimônio",        "lei": true,  "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "penal-7",           "name": "Crimes contra a Pessoa",            "lei": true,  "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "penal-1774898559268","name": "Lei de Drogas",                    "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "penal-1",           "name": "Aplicação da Lei Penal",            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-2",           "name": "Teoria do Crime",                   "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-3",           "name": "Tipicidade",                        "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-4",           "name": "Ilicitude e Culpabilidade",         "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-5",           "name": "Concurso de Crimes e Pessoas",      "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-6",           "name": "Penas e Medidas de Segurança",      "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "penal-9",           "name": "Prescrição",                        "lei": false, "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "penal-1775998340824","name": "Lei de Crimes Raciais",            "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": true  },
      { "id": "penal-1775484908784","name": "Lei anti-facção",                  "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": true  },
      { "id": "penal-1774898236785","name": "Jurisprudência 2026 (ATÉ 12/04)", "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "penal-1776005386026","name": "Jurisprudência 2025",              "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "processo-penal",
    "name": "Direito Processual Penal",
    "shortName": "P. Penal",
    "weight": 1,
    "topics": [
      { "id": "processo-penal-5",           "name": "Prisão e Liberdade Provisória",                    "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-9",           "name": "Tribunal do Júri",                                "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-4",           "name": "Provas",                                          "lei": true,  "doutrina": false, "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-0",           "name": "ANPP",                                            "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-1",           "name": "Protocolos de julgamento racial e de gênero",     "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-2",           "name": "Ação Penal",                                      "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-penal-3",           "name": "Competência",                                     "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "processo-penal-6",           "name": "Procedimentos",                                   "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-penal-7",           "name": "Recursos",                                        "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-penal-8",           "name": "Habeas Corpus",                                   "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "processo-penal-1774898466241","name": "Novidades Legislativas",                         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "processo-penal-1774898480409","name": "Jurisprudência 2026 (até 13/04)",                "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "processo-penal-1776257920974","name": "Lei Maria da Penha",                             "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": true  }
    ]
  },
  {
    "id": "direitos-humanos",
    "name": "Direitos Humanos",
    "shortName": "DH",
    "weight": 1,
    "topics": [
      { "id": "direitos-humanos-1774896057150","name": "Casos da Corte IDH vs Brasil",                "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direitos-humanos-1774896122827","name": "Convenção Interamericana contra o Racismo",   "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-7",           "name": "Povos Indígenas: Conv. 169 OIT / Res. CNJ",   "lei": false, "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direitos-humanos-6",           "name": "Pessoas em Situação de Rua",                  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direitos-humanos-1774896276427","name": "LGBT+ | Princípios de Yogyakarta",            "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-4",           "name": "Agenda 2030",                                  "lei": true,  "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-1774896107073","name": "Direitos dos Povos Tradicionais",             "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-1774896067223","name": "Casos Internacionais da Corte IDH",           "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-0",           "name": "Teoria Geral dos Direitos Humanos",            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-1",           "name": "Regras de Mandela",                            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-2",           "name": "Sistema Global (ONU)",                         "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-3",           "name": "Sistema Interamericano (OEA)",                 "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direitos-humanos-5",           "name": "Tratados Internacionais no Brasil",            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "eca",
    "name": "Direito da Criança e do Adolescente (ECA)",
    "shortName": "ECA",
    "weight": 1,
    "topics": [
      { "id": "eca-4",           "name": "Medidas Socioeducativas",     "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "eca-1776029069926","name": "SINASE",                     "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "eca-1",           "name": "Direitos Fundamentais da Criança","lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "eca-2",           "name": "Medidas de Proteção",         "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "eca-5",           "name": "Conselho Tutelar",            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "eca-6",           "name": "Adoção e Guarda",             "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "eca-7",           "name": "Crimes e Infrações Administrativas","lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "eca-1774898602691","name": "Jurisprudência 2026",        "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "eca-1776029778227","name": "Jurisprudência 2025",        "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "eca-3",           "name": "Jurisprudência 2024",         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "eca-0",           "name": "Jurisprudência 2023",         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "execues-penais-1774893363800",
    "name": "Execuções Penais",
    "shortName": "Exec. Penal",
    "weight": 1,
    "topics": [
      { "id": "execues-penais-1774893363800-1774893383783","name": "Progressão de Regime",              "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774893387922","name": "RDD",                               "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1776255000813","name": "Res.CNJ — antimanicomial/índigenas","lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "execues-penais-1774893363800-1774893393976","name": "Direitos dos apenados",             "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774897551926","name": "Faltas Disciplinares",              "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774897561904","name": "Direitos da Mulher Presa",          "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774897574396","name": "Livramento Condicional",            "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774897582894","name": "Regras de Mandela / Bangkok",       "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "execues-penais-1774893363800-1774897599042","name": "Jurisprudência 2026",               "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "execues-penais-1774893363800-1774897616783","name": "Súmulas",                           "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "execues-penais-1774893363800-1774898436762","name": "Novidades Legislativas até 2025",   "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "jurisprudncia-1774893149149",
    "name": "Criminologia",
    "shortName": "Criminol.",
    "weight": 1,
    "topics": [
      { "id": "jurisprudncia-1774893149149-1774893194867","name": "Escolas Criminológicas",  "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": true  },
      { "id": "jurisprudncia-1774893149149-1774896962474","name": "NFPSS",                   "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "jurisprudncia-1774893149149-1776030534518","name": "Criminologia Feminista",  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "direito-urbanstico-1774896525053",
    "name": "Direito Urbanístico",
    "shortName": "Urbanístico",
    "weight": 1,
    "topics": [
      { "id": "direito-urbanstico-1774896525053-1774896534601","name": "REURB",              "lei": true,  "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direito-urbanstico-1774896525053-1774896543059","name": "Estatuto da Cidade", "lei": true,  "doutrina": false, "juris": false, "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "direito-ambiental-1774896446831",
    "name": "Direito Ambiental",
    "shortName": "Ambiental",
    "weight": 1,
    "topics": [
      { "id": "direito-ambiental-1774896446831-1774896471400","name": "Princípios do Direito Ambiental",   "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "direito-ambiental-1774896446831-1774896496146","name": "Licenciamento",                     "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "direito-ambiental-1774896446831-1774901554341","name": "Responsabilidade Civil Ambiental",  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "direito-ambiental-1774896446831-1774901573924","name": "Política Nacional do Meio Ambiente","lei": false, "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "direito-ambiental-1774896446831-1774902003706","name": "Jurisprudência 2026 e 2025",        "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "institucional",
    "name": "Princípios Institucionais da DPE",
    "shortName": "DPE",
    "weight": 1,
    "topics": [
      { "id": "institucional-0",           "name": "Defensoria Pública na CF/88",                         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-1774897423069","name": "Defensoria na Constituição de SC",                   "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-1",           "name": "LC 80/94 – Lei Orgânica Nacional",                    "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "institucional-2",           "name": "LC Estadual da DPE-SC",                               "lei": true,  "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "institucional-3",           "name": "Princípios Institucionais",                           "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-4",           "name": "Autonomia e Independência Funcional",                 "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-5",           "name": "Assistência Jurídica Integral e Gratuita",           "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-6",           "name": "Atuação Extrajudicial",                               "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-7",           "name": "Legitimidade para Ações Coletivas",                  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-1776437549541","name": "Ondas de acesso à justiça",                         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "institucional-1776439296020","name": "Jurisprudência completa até 17/04/2026",            "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  }
    ]
  },
  {
    "id": "direito-tributrio-1774896657783",
    "name": "Direito Tributário",
    "shortName": "Tributário",
    "weight": 1,
    "topics": [
      { "id": "direito-tributrio-1774896657783-1774896670912","name": "Novidades da Reforma Tributária",         "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774896696849","name": "Impostos em espécie",                    "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774896709487","name": "Execução Fiscal",                        "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774897301948","name": "Imunidades Tributárias",                 "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774897317594","name": "Suspensão e Extinção do Crédito",        "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774897333606","name": "Princípios Tributários",                 "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false },
      { "id": "direito-tributrio-1774896657783-1774897349101","name": "Jurisprudência mais importante",         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direito-tributrio-1774896657783-1774897352555","name": "Súmulas Vinculantes",                    "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direito-tributrio-1774896657783-1776172761813","name": "Crédito Tributário",                     "lei": false, "doutrina": true,  "juris": true,  "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "direito-do-consumidor-1774896878011",
    "name": "Direito do Consumidor",
    "shortName": "Consumidor",
    "weight": 1,
    "topics": [
      { "id": "direito-do-consumidor-1774896878011-1774896891571","name": "Jurisprudência de 2026",  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direito-do-consumidor-1774896878011-1774896906415","name": "Jurisprudência de 2025",  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "direito-do-consumidor-1774896878011-1774896918039","name": "Superendividamento",      "lei": false, "doutrina": true,  "juris": false, "questoes": false, "revisao": false },
      { "id": "direito-do-consumidor-1774896878011-1774896926047","name": "Plano de Saúde",          "lei": false, "doutrina": false, "juris": false, "questoes": false, "revisao": false },
      { "id": "direito-do-consumidor-1774896878011-1774896934700","name": "Bancos e Serviços Financeiros","lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false }
    ]
  },
  {
    "id": "direitos-difusos-e-coletivos-1774896996519",
    "name": "Direitos Difusos e Coletivos",
    "shortName": "Difusos",
    "weight": 1,
    "topics": [
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897096520","name": "Teoria Geral das Ações Coletivas","lei": true,"doutrina": true,"juris": true,"questoes": false,"revisao": false },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897012807","name": "Ação Civil Pública",            "lei": true,"doutrina": false,"juris": false,"questoes": false,"revisao": true  },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897023338","name": "Ação Popular",                  "lei": true,"doutrina": true,"juris": false,"questoes": false,"revisao": true  },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897037128","name": "Mandado de Injunção Coletivo",  "lei": true,"doutrina": true,"juris": false,"questoes": false,"revisao": true  },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897044394","name": "Mandado de Segurança Coletivo", "lei": true,"doutrina": true,"juris": false,"questoes": false,"revisao": true  },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897056702","name": "Saúde",                         "lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897065865","name": "Moradia",                       "lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897075243","name": "População em Situação de Rua",  "lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774897088255","name": "Teoria Geral de tutela coletiva","lei": false,"doutrina": false,"juris": false,"questoes": false,"revisao": false },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774898910808","name": "Jurisprudência 2026",           "lei": true,"doutrina": true,"juris": true,"questoes": true,"revisao": true  },
      { "id": "direitos-difusos-e-coletivos-1774896996519-1774898921472","name": "Jurisprudência 2025",           "lei": true,"doutrina": true,"juris": true,"questoes": true,"revisao": true  }
    ]
  },
  {
    "id": "portugus-1774897123124",
    "name": "Português",
    "shortName": "Português",
    "weight": 1,
    "topics": [
      { "id": "portugus-1774897123124-1774897138573","name": "Interpretação de Texto",      "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "portugus-1774897123124-1774897152455","name": "Coesão e Coerência",          "lei": false, "doutrina": false, "juris": false, "questoes": true,  "revisao": false },
      { "id": "portugus-1774897123124-1774897159492","name": "Sintaxe",                     "lei": false, "doutrina": true,  "juris": false, "questoes": true,  "revisao": true  },
      { "id": "portugus-1774897123124-1774897163711","name": "Morfologia",                  "lei": false, "doutrina": false, "juris": false, "questoes": true,  "revisao": false },
      { "id": "portugus-1774897123124-1774897174633","name": "Regência e Concordância",     "lei": false, "doutrina": true,  "juris": false, "questoes": true,  "revisao": true  },
      { "id": "portugus-1774897123124-1774897204791","name": "Conjunções",                  "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "portugus-1774897123124-1775503321687","name": "Crase",                       "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "portugus-1774897123124-1775503326061","name": "Hífen",                       "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "portugus-1774897123124-1775505517568","name": "Acentuação",                  "lei": true,  "doutrina": true,  "juris": true,  "questoes": false, "revisao": false }
    ]
  },
  {
    "id": "histria-de-santa-catarina-1774897254382",
    "name": "História de Santa Catarina",
    "shortName": "Hist. SC",
    "weight": 1,
    "topics": [
      { "id": "histria-de-santa-catarina-1774897254382-1774971968599","name": "História","lei": true,"doutrina": true,"juris": true,"questoes": true,"revisao": false }
    ]
  },
  {
    "id": "filosofia-1774897845219",
    "name": "Filosofia",
    "shortName": "Filosofia",
    "weight": 1,
    "topics": [
      { "id": "filosofia-1774897845219-1774897859464","name": "Mulheres, raça e classe",     "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "filosofia-1774897845219-1774897872569","name": "Necropolítica",               "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": true  },
      { "id": "filosofia-1774897845219-1774897987118","name": "Crise da Democracia",         "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "filosofia-1774897845219-1774897998181","name": "Foucault",                    "lei": true,  "doutrina": true,  "juris": true,  "questoes": true,  "revisao": false },
      { "id": "filosofia-1774897845219-1774898010140","name": "Teorias críticas e pós-positivismo","lei": true,"doutrina": true,"juris": true,"questoes": true,"revisao": false }
    ]
  }
];

const INITIAL_SUBJECTS_DISC = [
  {
    "id": "discursiva-1777555868162",
    "name": "Discursiva",
    "weight": 1,
    "topics": [
      { "id": "discursiva-1777555868162-1777555953221","name": "Aulas de Prática Cível",        "estudado": false, "grifado": false, "questoes": false },
      { "id": "discursiva-1777555868162-1777555960141","name": "Aulas de Prática Penal",        "estudado": false, "grifado": false, "questoes": false },
      { "id": "discursiva-1777555868162-1777556000501","name": "Caderno de Teses Cíveis",       "estudado": false, "grifado": false, "questoes": false },
      { "id": "discursiva-1777555868162-1777556016196","name": "Caderno de Esqueletos Penais",  "estudado": false, "grifado": false, "questoes": false },
      { "id": "discursiva-1777555868162-1777561135724","name": "Caderno de Teses Penal",        "estudado": false, "grifado": false, "questoes": false },
      { "id": "discursiva-1777555868162-1777561143424","name": "Caderno de Palavras Chave",     "estudado": false, "grifado": false, "questoes": false }
    ],
    "simulados": []
  }
];

const INITIAL_SHARED = {
  streak: 0,
  shields: 0,
  dailyLogs: [],
  goals: { dailyHours: 4, weeklyHours: 28, dailyQuestions: 40, weeklyQuestions: 250, dailyFlashcards: 30 },
  xp: 0,
  achievements: [],
  petStage: 0,
  petHealth: 'healthy',
  concursos: [
    { id: 'dpe-sc', name: 'DPE SC', date: '2026-08-15', startedAt: '2026-05-01' },
    { id: 'dpe-rj', name: 'DPE RJ', date: '2027-03-15', startedAt: '2026-05-01' },
  ],
};

const INITIAL_OBJETIVA  = { subjects: INITIAL_SUBJECTS_OBJ,  heatmap: {} };
const INITIAL_DISCURSIVA = { subjects: INITIAL_SUBJECTS_DISC };

// ── Utilities ──
function getSubjectCompletionObj(subject) {
  const total = subject.topics.length * 5;
  if (total === 0) return 0;
  let checks = 0;
  subject.topics.forEach(t => {
    ['lei','doutrina','juris','questoes','revisao'].forEach(f => { if (t[f]) checks++; });
  });
  return (checks / total) * 100;
}
function getSubjectCompletionDisc(subject) {
  const total = subject.topics.length * 3;
  if (total === 0) return 0;
  let checks = 0;
  subject.topics.forEach(t => {
    ['estudado','grifado','questoes'].forEach(f => { if (t[f]) checks++; });
  });
  return (checks / total) * 100;
}
function getTotalStatsObj(subjects) {
  let total = 0, checks = 0;
  subjects.forEach(s => {
    total += s.topics.length * 5;
    s.topics.forEach(t => {
      ['lei','doutrina','juris','questoes','revisao'].forEach(f => { if (t[f]) checks++; });
    });
  });
  return { total, checks, percentage: total === 0 ? 0 : (checks / total) * 100 };
}
function getTotalStatsDisc(subjects) {
  let total = 0, checks = 0;
  subjects.forEach(s => {
    total += s.topics.length * 3;
    s.topics.forEach(t => {
      ['estudado','grifado','questoes'].forEach(f => { if (t[f]) checks++; });
    });
  });
  return { total, checks, percentage: total === 0 ? 0 : (checks / total) * 100 };
}

function getLevelInfo(xp) {
  const tiers = [
    { min: 0,     max: 499,      name: 'Aspirante',        color: '#7a7a8c' },
    { min: 500,   max: 1499,     name: 'Estagiário(a)',    color: '#00B8D4' },
    { min: 1500,  max: 3499,     name: 'Advogado(a)',      color: '#00A86B' },
    { min: 3500,  max: 6999,     name: 'Aprovado(a)',      color: '#C9A961' },
    { min: 7000,  max: 12999,    name: 'Nomeado(a)',       color: '#5B47B8' },
    { min: 13000, max: Infinity, name: 'Empossado(a)',     color: '#E85D5D' },
  ];
  const tier = tiers.find(t => xp >= t.min && xp <= t.max) || tiers[0];
  const next = tiers[tiers.indexOf(tier) + 1];
  return { tier, next, progress: next ? (xp - tier.min) / (next.min - tier.min) : 1, toNext: next ? next.min - xp : 0 };
}

function daysUntil(iso) {
  if (!iso) return null;
  const now = new Date(); now.setHours(0,0,0,0);
  const then = new Date(iso); then.setHours(0,0,0,0);
  return Math.round((then - now) / (1000 * 60 * 60 * 24));
}

// ── Pet System ──
// 8 estágios — cores atualizadas para paleta TOGA
const PET_STAGES = [
  { stage: 1, name: 'Ovinho Místico',         minXp: 0,     nextXp: 100,
    color: '#fff5e0', accent: '#C9A961', glow: '#E8C97A', shellColor: '#fff0d8',
    desc: 'Algo místico está adormecido aqui dentro… A jornada começa em silêncio.' },
  { stage: 2, name: 'Ovo Trincando',          minXp: 100,   nextXp: 250,
    color: '#fff0d0', accent: '#5B47B8', glow: '#7B67D8', shellColor: '#ffe5b8',
    desc: 'A casca começa a ceder! Sinais de vida pulsam por dentro.' },
  { stage: 3, name: 'Filhote Recém-Eclodido', minXp: 250,   nextXp: 600,
    color: '#e8e0ff', accent: '#7B67D8', glow: '#5B47B8',
    desc: 'Eclodiu! Olhos enormes descobrem o mundo pela primeira vez. 🌱' },
  { stage: 4, name: 'Dragãozinho Curioso',    minXp: 600,   nextXp: 1500,
    color: '#d8d0f8', accent: '#5B47B8', glow: '#7B67D8',
    desc: 'Pequenos chifrinhos despontaram. Já ensaia os primeiros voos curtos.' },
  { stage: 5, name: 'Dragão Jovem',           minXp: 1500,  nextXp: 3500,
    color: '#c8b8f8', accent: '#4A37A8', glow: '#7B67D8',
    desc: 'Asas mais firmes, olhar determinado. Sua jornada se intensifica. ✨' },
  { stage: 6, name: 'Dragão Adulto',          minXp: 3500,  nextXp: 7000,
    color: '#a8a0e8', accent: '#3A2780', glow: '#5B47B8',
    desc: 'Forma plena. Sabedoria nos olhos. Pronto para grandes batalhas jurídicas.' },
  { stage: 7, name: 'Dragão Concurseiro',     minXp: 7000,  nextXp: 13000,
    color: '#9488f8', accent: '#2A1860', glow: '#E85D5D',
    desc: 'Vestiu a toga! Segura o livro da Lei. Pronto para a posse. ⚖️' },
  { stage: 8, name: 'Empossado(a)',           minXp: 13000, nextXp: Infinity,
    color: '#b0a4f8', accent: '#C9A961', glow: '#E8C97A',
    desc: 'Forma final. Aura de justiça encarnada. A aprovação chegou. 👑' },
];

function getPetStageInfo(xp) {
  const idx = PET_STAGES.findIndex(s => xp >= s.minXp && xp < s.nextXp);
  const stage = idx >= 0 ? PET_STAGES[idx] : PET_STAGES[PET_STAGES.length - 1];
  const realIdx = PET_STAGES.indexOf(stage);
  const next = PET_STAGES[realIdx + 1];
  const span = next ? (next.minXp - stage.minXp) : 1;
  const progress = next ? Math.min(1, (xp - stage.minXp) / span) : 1;
  const xpToNext = next ? next.minXp - xp : 0;
  return { ...stage, progress, next, xpToNext };
}
function getPetStage(xp) { return getPetStageInfo(xp).stage; }

function daysSinceLastStudy(dailyLogs) {
  const studied = dailyLogs.filter(l => (l.hours > 0) || (l.questions > 0) || (l.reviews > 0));
  if (studied.length === 0) return Infinity;
  const last = studied.map(l => l.date).sort().reverse()[0];
  const today = new Date(); today.setHours(0,0,0,0);
  const lastD = new Date(last + 'T00:00:00');
  return Math.max(0, Math.round((today - lastD) / 86400000));
}

function studied2DaysInRow(dailyLogs) {
  const today = new Date(); today.setHours(0,0,0,0);
  const yest = new Date(today); yest.setDate(yest.getDate() - 1);
  const todayISO = today.toISOString().slice(0,10);
  const yestISO  = yest.toISOString().slice(0,10);
  const wasActive = (iso) => {
    const l = dailyLogs.find(d => d.date === iso);
    return l && ((l.hours > 0) || (l.questions > 0) || (l.reviews > 0));
  };
  return wasActive(todayISO) && wasActive(yestISO);
}

function nextPetHealth(currentHealth, dailyLogs) {
  if (currentHealth === 'healthy') {
    if (dailyLogs.length === 0) return 'healthy';
    return daysSinceLastStudy(dailyLogs) >= 3 ? 'sick' : 'healthy';
  }
  return studied2DaysInRow(dailyLogs) ? 'healthy' : 'sick';
}

window.DA = {
  INITIAL_SHARED, INITIAL_OBJETIVA, INITIAL_DISCURSIVA,
  getSubjectCompletionObj, getSubjectCompletionDisc,
  getTotalStatsObj, getTotalStatsDisc,
  getLevelInfo, daysUntil, getPetStage,
  PET_STAGES, getPetStageInfo,
  daysSinceLastStudy, studied2DaysInRow, nextPetHealth,
};
