var globalStore = [];

function getGlobalStore(i)
{
	return globalStore[i];
}

function putGlobalStore(n, i)
{
	globalStore[i] = n;
}