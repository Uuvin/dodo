package com.dodo.routine.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "routine")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private LocalTime routineTime;

    @Column(nullable = false)
    private boolean completed = false;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Routine(String name, LocalTime routineTime) {
        this.name = name;
        this.routineTime = routineTime;
    }

    public void update(String name, LocalTime routineTime) {
        this.name = name;
        this.routineTime = routineTime;
    }

    public void toggleCompleted() {
        this.completed = !this.completed;
    }
}
