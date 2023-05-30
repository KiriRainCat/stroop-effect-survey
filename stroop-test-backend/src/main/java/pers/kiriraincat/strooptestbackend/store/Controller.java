package pers.kiriraincat.strooptestbackend.store;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {

    @Resource
    StoreService service;

    @PostMapping("/store")
    public Map<String, String> store() {
        HashMap<String, String> result = new HashMap<>();

        if(service.store()) {
            result.put("success", "true");
            result.put("msg", "Test result stored successfully, thanks!");
        } else {
            result.put("success", "false");
            result.put("msg", "Test result upload failed, pls try again");
        }

        return result;
    }
}
