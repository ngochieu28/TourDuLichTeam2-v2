package com.vti.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vti.utils.FileManager;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService implements IFileService {

	private FileManager fileManager = new FileManager();
	private String linkFolder = "~/TourDuLichTeam2-v2/image";


	@Override
	public String uploadImage(MultipartFile image) throws IOException {

		String nameImage = new Date().getTime() + "." + fileManager.getFormatFile(image.getOriginalFilename());

		String path = linkFolder + "\\" + nameImage;

		fileManager.createNewMultiPartFile(path, image);

		// TODO save link file to database

		// return link uploaded file
		return nameImage;
	}

	@Override
	public byte[] getImage(String fileName) throws IOException {
		String filePath = linkFolder + "\\" + fileName;

		// Đọc dữ liệu của file ảnh thành mảng byte[]
		Path imagePath = Paths.get(filePath);
		return Files.readAllBytes(imagePath);
	}
}
