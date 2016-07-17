class NegociacaoService
{
    obterNegociacaoesDaSemana(callback)
    {
        let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');
		/* config */
		xhr.onreadystatechange = () => {
			if( xhr.readyState == 4 )
			{
				if( xhr.status == 200 )
				{
					console.log(JSON.parse(xhr.responseText));
					
					callback( null, JSON.parse(xhr.responseText).map( obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ) );
				}
				else
				{
					callback('Não foi possível obter as negociações da semana', null);
                    console.log(xhr.responseText);
				}
			}
		}
		xhr.send();
    }
}