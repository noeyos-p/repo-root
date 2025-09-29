package com.my.backend.service;

import com.my.backend.dto.CreateUserRequest;
import com.my.backend.entity.User;
import com.my.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
        // 전체 데이터 끌고 오기
    }

    public User create(CreateUserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setCity(request.getCity());
        return repository.save(user);
        // 새로 유저 생성
    }

    public void delete(Long id) {
        repository.deleteById(id);
        // 유저 삭제
    }
}
