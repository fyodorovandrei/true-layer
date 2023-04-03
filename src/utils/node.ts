import axios from "axios";
import fs from "fs";
import path from "path";

export const getAsStaticFile = (url: string): Promise<string> => new Promise((resolve, reject) => {
	const filename = url.split('/').pop() as string;
	const finalDestinationPath = path.resolve( __dirname, "..", "..", "public", "static");

	const file = fs.createWriteStream(finalDestinationPath + "/" + filename);

	axios({
		url,
		method: 'GET',
		responseType: 'stream'
	}).then((response) => {
		let error: Error | null = null;
		response.data.pipe(file);

		file.on('error', err => {
			error = err;
			file.close();
			reject(err);
		});

		file.on('close', () => {
			if (!error) {
				resolve(`/static/${filename}`);
			}
		});
	});
})
