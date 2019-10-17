function init_helper_ds(
	p_bracketsConfig,
	p_differentBr,
	p_similarBr
)
{
	let cfg = p_bracketsConfig;

	for(let n = 0; n < cfg.length; ++n)
	{
		//say(cfg[n]);
		// Let's code each bracket pair using a number! :-)
		let leftBr = cfg[n][0];
		let rightBr = cfg[n][1];

		let leftID = n + 1;
		let rightID = -(n + 1);

		// The brackets are the same. ['|','|'] for example
		if (leftBr == rightBr)
			p_similarBr[leftBr] = leftID;
		else
		{
			// The brackets are different. ['(',')'] for example
			p_differentBr[leftBr] = leftID;
			p_differentBr[rightBr] = rightID;
		}
	}
}

module.exports = function check(p_str, p_bracketsConfig) {
	let arr = p_str.split('');

	
	let differentBr = {};
	let similarBr = {};

    init_helper_ds(p_bracketsConfig, differentBr, similarBr);

    let stackBr = [];

    for(let char of Object.values(arr))
    {
    	let isMatch = StackPopIfMatched(
    						char,
    						stackBr,
    						differentBr,
    						similarBr
    					);
		// There is no a similar bracket on the stack's top
		if (!isMatch)
		{
			let c = getCodeForBr(char,differentBr,similarBr);

			if (c !== undefined)
				stackBr.push(c);
		}
    }

    // There are no unmatched brackets and vice versa ;-)
    return !stackBr.length;
}

///////////////////////////////////////////////////////////////////////////
//
//
//
function getCodeForBr(p_char,p_differentBr,p_similarBr,pout_isSimilarBr = null) {

	if (pout_isSimilarBr !== null)
		pout_isSimilarBr[0] = false;

    let out_Code = p_differentBr[p_char];

    if (out_Code === undefined)
    {
    	out_Code = p_similarBr[p_char];

    	if (pout_isSimilarBr !== null)
    		pout_isSimilarBr[0] = true;
    }

	return out_Code;
}

///////////////////////////////////////////////////////////////////////////
//
// let isMatch = StackPopIfMatched(...)
//
function StackPopIfMatched(p_char, p_stackBr, p_dirrentBr, p_similarBr) {
	let out_Result = false;

	// for the case of the wrong input ;-)
	if (!p_stackBr.length)
		return false;

	let isSimilarBr = [];
	let bracket_code = getCodeForBr(p_char, p_dirrentBr, p_similarBr, isSimilarBr);

	if (bracket_code !== undefined)
	{
		let top = p_stackBr[p_stackBr.length-1];

		let inputBrCode = bracket_code;
		let stackBrCode = top;

		// It is a matched pair of brackets
		// The codes are like -5 and +5
		if (stackBrCode + inputBrCode == 0)
		{
			// And there is a left bracket on the top of a stack
			if (stackBrCode > 0)
			{
				// Let's remove a left bracket as we have a 'good' 
				// matched pair
				p_stackBr.pop();

				out_Result = true;
			}
		}
		// If the brackets are similar
		// and their codes are equal
		// Let's remove a bracket from the top
		else if(isSimilarBr[0] && stackBrCode == inputBrCode)
		{
			p_stackBr.pop();
			out_Result = true;
		}
	}
	
	return out_Result;
}


function say(p_text) {
	console.log(p_text);
}