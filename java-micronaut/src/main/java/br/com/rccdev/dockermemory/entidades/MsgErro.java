package br.com.rccdev.dockermemory.entidades;

import io.micronaut.core.annotation.Introspected;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Accessors(fluent = false, chain = true)
@Getter @Setter
@Introspected
public class MsgErro {
  
  private int code = 0;
  
  private Object data = null;
  
  private String msg = "";

}
