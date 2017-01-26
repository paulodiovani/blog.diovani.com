---
layout: post
title: Magia em Dresden Files RPG
image: /media/2017/dresden_and_the_denarian_by_dsillustration-d6t3lvm.jpg
image_credits: dsillustration.deviantart.com
---

Prometi fazer um resumo dos sistemas de magia no DFRPG para auxiliar meu grupo. Vou tentar ser bem breve, para permitir um leitura e entedimento rápido.

Obviamente, para entender como funcionam os testes é necessário conhecer as regras do FATE RPG, mais precisamente como são realizados os testes em conflitos, por isso vou expliar brevemente as regras antes, assim como como funcionam os níveis de armas e armaduras.

## Testes em FATE RPG

_As regras completas do Fate Core estão disponíves no site https://fate-srd.com._

Todos os testes em FATE são realizados da seguinte forma:

- Oposição passiva
    + `Perícia` + `4 Dados FATE` - `Dificuldade`
- Oposição ativa (resistidos)
    + (`Perícia de Ataque` + `4 Dados FATE`) - (`Perícia de Defesa` + `4 Dados FATE`)

O resultado do teste, contado em _Shifts_ (ou Ampliações em pt) é o que define o sucesso do teste ou "dano" a ser absorvido pelo oponente.

- `< 0` Falha, ou sucesso com custo maior
- `= 0` Sucesso com custo menor
- `1, 2` Sucesso
- `> 2` Sucesso com estilo

### Níveis de Armas e Armaduras

_Weapon and Armor ratings_ no original inglês.

Níveis de Armas e Armaduras são uma regra opcional em FATE (e geralmente desnecessária), mas são usadas no DFRPG, especialmente para determinar o quão forte um feitiço é.

São escritas como `Weapon:VALUE`, onde `VALUE` é a quantidade de _shifts_ extras que ela fornece quando um ataque é bem sucedido. Armas, porém, não influenciam no sucesso ou falha do teste.

Em poucas palavras, uma `Weapon:2` causa duas _shifts_ além do sucesso do teste. Ex:

- Ataque: `Guns 3` + `[ ][-][+][+]` = `4`
- Defesa: `Atletics 1` + `[ ][ ][+][+]` = `3`
- Sucesso: `4 - 3` = `1`
- _shifts_: `1` + `Weapon:2` = `3`

Armaduras funcionam da mesma forma. Anotadas como `Armor:VALUE`, elas reduzem as _shifts_ após um sucesso no teste.

## Como funciona a Magia no _Dresdenverse_

_Explicações mais detalhadas sobre magia em DFRPG podem ser encontradas no blog do Rick Neal, nos artigos [Mystic Theory 101: Magic in DFRPG, Part One](http://www.rickneal.ca/?p=628), [Evocation, or How to Blow Stuff Up: Magic in DFRPG, Part Two](http://www.rickneal.ca/?p=629) e [Thaumaturgy, or How to Break the Rules: Magic in DFRPG, Part Three](http://www.rickneal.ca/?p=632)_

Metaforicamente falando, qualquer magia em _Dresden Files_ é realizada seguindo os seguintes passos:

1. Criar um construto para o feitiço
2. Carregar o construto com a energia necessária
3. Liberar a energia
    
O _construto_ é um receptáculo que vai conter a magia até ela ser liberada.

A partir daí os tipos de magia são separados entre _Evocation_ e _Thaumaturgy_, sendo que, na prática, a grande diferença deles é que em _Evocations_ o construto é criado na mente do mago, enquanto _Thaumaturgy_ se vale de ingredientes físicos para este.

### _Evocation_

Perícias importantes: `Conviction`, `Discipline`.

_Evocation_ é a magia instantânea, sem preparação alguma, baseada apenas na vontade do mago. É a _magia de combate_.

Numa _Evocation_ o contruto situa-se na mente do mago, por isso elas são limitadas à capacidade deste de se concentrar (`Conviction`) e custam _Mental Stress_.

#### Características

- Instantânea
- Utiliza um construto mental
- Bruta, dificilmente resulta em efeitos precisos
- Baseada nos elementos: _Water, Fire, Wind, Earth e Spirit_
- Limitada à `Conviction` do mago
- Perigosa, difícil de controlar
- Pode atingir qualquer alvo ao alcance da visão

#### O que pode ser realizado com _Evocations_?

- Atacar
- Defender
- Criar vantagens (aspectos na cena ou num alvo)
- Criar barreiras de proteção temporárias ou armadura

#### Passos para realização e regras

1. Definir o de poder, ou a quantidade de _shifts_, empregado no feitiço.

    - Esses _shifts_ de poder funcionam como níveis de arma. Ex: `Weapon:3`
    - O mago anota `1 ponto` de _Mental Stress_ para feitiços de poder **igual ou menor** que sua `Conviction`
    - Para feitiços de poder **maior** que sua `Conviction`, ele anota `1 ponto` de _Mental Stress_ + `1 ponto`para cada shift acima de `Conviction`

2. Realizar um teste de `Discipline` para controlar o feitiço.
    
    - A dificuldade desse teste é igual ao poder empregado no feitiço no passo anterior
    - Caso o teste de `Discipline` não alcance o poder do feitiço, o mago deve lidar com a energia restante (a diferença em _Shifts_), de uma das sequintes formas
        + _Backslash_ tomar _Stress_ (Físico ou Mental, dependendo do tipo de feitiço) igual à diferença de Shifts e garantir que o feitiço funcione como desejado (não há perda de poder)
        + _Fallout_ liberar a energia restante para o ambiente, podendendo causar danos ou criar aspectos aleatórios na cena (nesse caso, o valor de poder é reduzido)
    - Esse teste também serve como Ataque (caso seja um ataque). Assim o ataque fica `Discipline` + `4 Dados FATE` e com _Weapon rating_ igual ao poder do feitiço.

### _Thaumaturgy_

Perícias importantes: `Conviction`, `Discipline`, `Lore`.

_Thaumaturgy_ é a magia ritualistica, que emprega diferentes ingredientes e geralmente leva tempo para ser realizada.

Seu construto é sempre criado com ingredientes físicos, geralmente relacionados ao objetivo do feitiço (ex: cabelo de uma vítima para um feitiço de localização).

Em termos de jogo, enquanto _Evocation_ é geralmente usada em conflitos, _Thaumaturgy_ é comumente relacionada à história.

#### Características

- Demorada, qualquer efeito leva pelo menos alguns minutos
- Utiliza um construto físico
- Refinada, podendo ser bastante precisa
- Dividida em tipos, de acordo com o objetivo do efeito
- Não limitada a praticamente nada (além do tempo)
- Muito, mas muito mais poderosa
- Mais fácil de controlar
- Pode atingir qualquer alvo... Bem, qualquer mesmo

#### O que pode ser realizado com _Thaumaturgy_?

- Criar vantagens (aspectos na cena ou num alvo), incluindo transformações significativas
- Criar barreiras de proteção mais duradouras, alarmes, etc
- Obter informações inacessíveis
- Resolver problemas impossíveis
- Interagir com o sobrenatural
- Moldar objetos físicos a partir do nada
- Etc

#### Passos para realização e regras

1. Definir a Complexidade do feitiço
    
    - A Complexidade é a quantidade de _Shifts_ que deve ser alcançada posteriormente para que o feitiço tenha sucesso
    - Deve incluir variáveis como poder do efeito, área, distância, duração e possível defesa do alvo
    - Não há limite para a complexidade definida, mas feitiços muito complexos levam tempo e tem mais risco de falhar
    - Se a Complexidade for **menor ou igual** à `Lore` do mago, assume-se que ele já possui tudo o que precisa à mão

2. Preparar o construto para o feitiço
    
    - Deve-se acumular _Shifts_ igual à Complexidade, representando a busca por equipamentos, ingredientes, etc. Isso pode ser feito das seguintes maneiras.
        + Invocar aspectos (com gasto de _FATE Points_): `+2` por cada
        + Utilizar mais tempo: `+1` por cena
        + Tomar Consequências / sacrificar a si mesmo: + valor da Consequência
        + Infligir Consequências / sacrificar outros: + valor da Consequência
            *  Note que este é um caminho obscuro, possivelmente quebrando a 1a lei da magia
        + Fazer declarações / Criar Aspectos: +2 (ou mais) por Aspecto.
            * Possivelmente a melhor e mais divertida forma, o jogador faz um teste de perícia, explicando como aquele conhecimento ou prática ajudará no Feitiço, e adiciona um Aspecto com invocações gratuítas à cena.
    - Outros personagens podem ajudar

3. Obter e controlar energia para o construto
    
    - O mago deve realizar sucessivos testes de `Discipline` para controlar a energia
    - Para cada teste, ele deve definir a quantidade _Shifts_ a adicionar, muito parecido em como é feito em _Evocations_
        + Uma quantidade **igual ou menor** que a `Conviction` do mago, **não anota** _Mental Stress_
        + Uma quantida **maior** que sua `Conviction` anota `1 ponto de _Mental Stress_ para cada shift acima de Conviction` do mago
    - Cada sucesso acumula _Shifts_ igual à quantidade definida
    - ATENÇÃO: Em caso de falha, a energia acumulada fica fora de controle, e o mago é obrigado a decidir entre _Backslash_ ou _Fallout_ exatamente como em _Evocations_, contudo, a quantidade de energia liberada aqui é igual ao **total acumulado** até o momento. Dado que _Thaumaturgy_ pode facilmente lidar com valores de dois dígitos, é um forte risco de causar um dano massivo ao usuário ou ambiente. Dependendo da natureza do feitiço, ul _Fallout_ poderia até invocar uma criatura indizível do _Nevernever_.

4. Liberar a energia do feitiço completo

    - Uma vez que os sucessos atinjam a Complexidade, o feitiço está completo e terá o efeito desejado.
    - Se o alvo for animado, ele possivelmente terá oportunidade de realizar um teste de Defesa (desde que possa perceber o feitiço)
