package com.vti.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.vti.service.IFileService;
import com.vti.utils.FileManager;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/files")
@Validated
public class FileController {

	@Autowired
	private IFileService fileService;

	@PostMapping(value = "/image")
	public ResponseEntity<?> upLoadImage(@RequestParam(name = "image") MultipartFile image) throws IOException {

		if (!new FileManager().isTypeFileImage(image)) {
			return new ResponseEntity<>("File must be image!", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		return new ResponseEntity<>(fileService.uploadImage(image), HttpStatus.OK);
	}

	@GetMapping(value = "/image/{fileName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String fileName) throws IOException {
		byte[] imageData = fileService.getImage(fileName);

		if (imageData == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
	}
}
