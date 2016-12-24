export class View
{
	constructor(elem)
	{
		this._elem = elem;
	}

	template(){
		throw new Error('O método _template deve ser implementado');
	}

	update(model)
	{
		this._elem.innerHTML = this.template(model);
	}
}