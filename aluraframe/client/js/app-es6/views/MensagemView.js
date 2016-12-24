import {View} from './View';

export class MensagemView extends View
{
	constructor(elem)
	{
	    super(elem);
	}

	template(model)
	{
		return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
	}
}