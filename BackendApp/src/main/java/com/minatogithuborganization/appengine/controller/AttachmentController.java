package com.minatogithuborganization.appengine.controller;

import com.vs.rappit.base.factory.InstanceFactory;
import com.minatogithuborganization.appengine.service.AttachmentServiceImpl;
import com.minatogithuborganization.appengine.base.controller.AttachmentBaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping(path = "/rest/attachments/", produces = "application/json")
public class AttachmentController extends AttachmentBaseController<AttachmentServiceImpl> {
	public AttachmentController(AttachmentServiceImpl attachmentService) {
		super(attachmentService);
    }
}
