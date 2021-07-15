create table public.tb_campeonato (
  co_campeonato     serial primary key,
  nu_ano            integer not null,
  no_times_melhores_colocados varchar(25)[4],
  no_artilheiros    text[],
  nu_gols           integer not null
);